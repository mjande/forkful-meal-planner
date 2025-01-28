import classes from './navbar.module.css';
import {
  IconCalendar,
  IconChefHat,
  IconHelp,
  IconHome,
  IconSalt,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

const links = [
  { link: '', label: 'Home', path: '/', icon: IconHome },
  { link: '', label: 'Ingredients', path: '/ingredients', icon: IconSalt },
  { link: '', label: 'Recipes', path: '/recipes', icon: IconChefHat },
  { link: '', label: 'Meal Plans', path: 'meal-plans', icon: IconCalendar },
  { link: '', label: 'Help', path: 'help', icon: IconHelp },
];

export function Navbar() {
  const [active, setActive] = useState('Home');

  const linkElements = links.map((link) => (
    <Link
      to={link.path}
      className={classes.link}
      data-active={link.label === active || undefined}
      href={link.link}
      key={link.label}
      onClick={() => {
        setActive(link.label);
      }}
    >
      <link.icon className={classes.linkIcon} stroke={1.5} />
      <span>{link.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{linkElements}</div>
    </nav>
  );
}
