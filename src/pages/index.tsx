import React from 'react';
import fetch from 'isomorphic-unfetch';
import { GetServerSideProps } from 'next';

const Index: any = ({ prefixes }) => (
  <>
    <table>
      <thead>
        <tr>
          <th>region</th>
          <th>service</th>
          <th>ip_prefix</th>
        </tr>
      </thead>
      <tbody>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */}
        {prefixes.map((prefix, key) => (
          <tr key={key}>
            <td>{prefix.region}</td>
            <td>{prefix.service}</td>
            <td>{prefix.ip_prefix}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https://ip-ranges.amazonaws.com/ip-ranges.json`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ipRanges: any = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { prefixes } = ipRanges;

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      prefixes,
    },
  };
};

export default Index;
