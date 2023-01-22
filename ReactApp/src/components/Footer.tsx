import React, { FC } from 'react';
import { Footer } from 'flowbite-react';

const FooterPage: FC = () => (
  <Footer container className="bg-gray-600 mt-8 rounded-none">
    <Footer.Copyright
      className="text-blue-50"
      href="/"
      by="Paweł Włodarczyk"
      year={2023}
    />
  </Footer>
);

export default FooterPage;
