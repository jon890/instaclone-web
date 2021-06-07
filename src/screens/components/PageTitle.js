import { Helmet } from 'react-helmet-async';

function PageTitle({ title }) {
  console.log(title);
  return <Helmet>{title} | Instaclone</Helmet>;
}

export default PageTitle;
