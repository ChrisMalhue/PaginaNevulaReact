import React from 'react';
import { List } from '../atoms/List';
import { ListItem } from '../atoms/ListItem';
import Link from '../atoms/Link';

export function ListadoEnlaces({ items = [], className, itemClassName, linkClassName }) {
  return (
    <List className={className}>
      {items.map((item, index) => (
        <ListItem key={index} className={itemClassName}>
          <Link href={item.href} className={linkClassName}>{item.label}</Link>
        </ListItem>
      ))}
    </List>
  );
}