import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/shared/header/header'
import { Button, Container, Flex, Text, Paper, Select, TextInput } from '@mantine/core'
import { convertUnits, getConversions } from '../services/unit-converter.service'
import { useForm } from '@mantine/form'
import { IconArrowBigRight } from '@tabler/icons-react'
import { FormEvent, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export const Route = createFileRoute('/unit-converter')({
  component: RouteComponent,
  loader: getConversions,
})

interface FormData {
  fromUnit: string;
  toUnit: string;
  val: number;
}

function RouteComponent() {
  const conversions = Route.useLoaderData();
  const [conversionResult, setConversionResult] = useState('');

  const convert = useMutation({
    mutationFn: convertUnits,
    mutationKey: ['convertUnits'],
    onError: (err) => console.log(err),
    onSuccess: (response) => {
      setConversionResult(response.result);
    }
  })

  const form = useForm<FormData>({
    initialValues: {
      fromUnit: conversions.units[0],
      toUnit: conversions.units[1],
      val: 1,
    },
    validate: (values) => ({
      toUnit: values.toUnit == values.fromUnit ? 'Units must be different' : null,
    }),
  });

  useEffect(() => {
    form.validate();
  }, [form.values.fromUnit, form.values.toUnit]);

  useEffect(() => {
    setConversionResult('');
  }, [form.values]);

  function submit(event: FormEvent) {
    event.preventDefault();
    convert.mutate(form.values);
  }

  return (
    <>
      <Header title="Unit Converter"></Header>
      <Paper shadow="sm" p="md" withBorder w="700px">
        <form onSubmit={submit}>
          <Flex align="flex-end" gap="md">
            <TextInput label="Quantity"
              key={form.key('val')}
              {...form.getInputProps('val')}
            ></TextInput>
            <Select
              label="Converting from"
              description="Unit to convert from"
              data={conversions.units}
              key={form.key("fromUnit")}
              {...form.getInputProps("fromUnit")}
            />
            <Container>
              <IconArrowBigRight></IconArrowBigRight>
            </Container>
            <Select
              label="Converting to"
              description="Unit to convert to"
              data={conversions.units}
              key={form.key("toUnit")}
              {...form.getInputProps("toUnit")}
            />
            <Button type='submit' w="120px">Convert</Button>
          </Flex>
        </form>
        {conversionResult ? 
          <>
            <Text mt="sm" fw="700" td="underline">Result</Text>
            <Text>{`${form.values.val} ${form.values.fromUnit} is equal to ${conversionResult} ${form.values.toUnit}`}</Text> 
          </> : null
      }
      </Paper>
    </>

  ) 
}
