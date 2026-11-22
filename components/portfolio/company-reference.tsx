import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { officeReferences, type OfficeKey } from "../../content/offices";
import styles from "./portfolio.module.css";

export function CompanyReference({ officeKey, zh }: { officeKey: OfficeKey; zh: boolean }) {
  const office = officeReferences[officeKey];
  const copy = zh ? office.zh : office.en;
  return <span className={styles.companyWrap} style={{ "--link-color": office.color } as CSSProperties}>
    <Link href={`/explorations/#${officeKey}`} className={styles.inlineLink} aria-describedby={`${officeKey}-preview`}>{copy.name}</Link>
    <span className={styles.companyPopup} id={`${officeKey}-preview`} role="note">
      <Image src={office.image} alt={copy.alt} width={240} height={160} />
      <strong>{copy.title}</strong>
      <span>{copy.description}</span>
      <small>{copy.credit}</small>
    </span>
  </span>;
}

export function OfficeFigure({ officeKey, zh }: { officeKey: OfficeKey; zh: boolean }) {
  const office = officeReferences[officeKey];
  const copy = zh ? office.zh : office.en;
  return <figure className={styles.officeFigure}>
    <Image src={office.image} alt={copy.alt} width={office.width} height={office.height} />
    <figcaption>
      <a href={office.photoSource} target="_blank" rel="noreferrer">{copy.caption}</a>
      {office.addressSource ? <> · <a href={office.addressSource} target="_blank" rel="noreferrer">{copy.addressLabel}</a></> : null}
    </figcaption>
  </figure>;
}
