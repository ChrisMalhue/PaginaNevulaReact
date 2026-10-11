import React from 'react';
import { Caluga } from '../atoms/Caluga';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Link from '../atoms/Link';
import { List } from '../atoms/List';
import { ListItem } from '../atoms/ListItem';
import { ListadoEnlaces } from '../molecules/Lists';
import '../../styles/components/organisms/Footer.css';

export function Footer({ logo, enlaces = [], contactos = [], redes = [] }) {
  return (
    <Caluga Component="footer" className="footer">
      <Image src={logo} alt="Nebula" className="footer-logo" />

      <Caluga className="footer-help">
        <Text variant="h3" className="footer-title">¿Necesitas ayuda?</Text>
        <ListadoEnlaces items={enlaces} className="footer-links" linkClassName="footer-link" />
      </Caluga>

      <List className="footer-contact">
        {contactos.map((c, i) => (
          <ListItem key={i} className="footer-contact-item">
            <span className="footer-icon">{c.icono}</span>
            <Text variant="span">{c.texto}</Text>
          </ListItem>
        ))}
      </List>

      <Caluga className="footer-social">
        {redes.map((r, i) => (
          <Link key={i} href={r.href} target="_blank" rel="noopener noreferrer">
            <Image src={r.icono} alt={r.nombre} className="footer-social-icon" />
          </Link>
        ))}
      </Caluga>
    </Caluga>
  );
}