import React, { FC } from 'react';
import { Footer } from 'flowbite-react';

const FooterPage: FC = () => (
  <Footer container className="mt-8 rounded-none fixed bottom-0">
    <Footer.Copyright
      href="/"
      by="Paweł Włodarczyk"
      year={2023}
    />
  </Footer>
);

export default FooterPage;
