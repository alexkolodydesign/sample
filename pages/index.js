import Layout from '../components/Layout'
import Head from '../components/Head'
import { nextConnect } from '../redux/store'

const Dashboard = props =>
  <Layout>
    <Head/>
    <div className="wrapper">
      <h1>Hello World</h1>
    </div>
  </Layout>

export default nextConnect((state, res) => state)(Dashboard);
