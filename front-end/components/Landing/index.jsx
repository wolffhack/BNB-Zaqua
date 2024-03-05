"use client";
import Head from "next/head";
import Heeader from "./HeadTop";
import FrontMain from "./FrontMain";
import DIdentity from "./DIdentity";
import UseCases from "../../components/comps/UseCases";
import Team from "../../components/comps/Team";
import Contact from "../comps/Contact";

export default function Landing() {
  return (
    <>
      <Head>
        <title>Zaqua</title>
        <meta
          name="description"
          content="Zaqua Network is a crowdfunding decentralized platform, that allows community to come together and clean the water"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="..../public/favicon.svg" />
      </Head>
      <header>
        <Heeader />
      </header>
      <main>
        <FrontMain />
      </main>
      <section>
        <UseCases />
      </section>
      <section>
        <DIdentity />
      </section>
      <section>
        <Team />
      </section>
      <footer>
        <Contact />
      </footer>
    </>
  );
}
