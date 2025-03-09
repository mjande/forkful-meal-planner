export async function getConversions() {
  const res = await fetch(`${import.meta.env.VITE_UNIT_CONVERTER_SERVICE_URL}/conversions`);
  return res.json()
}

export async function convertUnits(formData: { fromUnit: string, toUnit: string, val: number}) {
  console.log(`Requesting conversion of ${formData.val} ${formData.fromUnit} to ${formData.toUnit}`);
  const res = await fetch(`${import.meta.env.VITE_UNIT_CONVERTER_SERVICE_URL}/convert`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formData),
    }
  )

  const json = (await res.json()) as { result: string };

  console.log(`Received result of ${json.result} ${formData.toUnit}`);

  return json;
}
