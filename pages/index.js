import fs from 'fs/promises';
import path from 'path';
import Link from "next/link";
function HomePage(props) {
  return (
    <ul>
        {
            props.products.map((product) => {
                return (<li key={product.id}><Link href={`${product.id}`}>{product.title}</Link></li>)
            })
        }
    </ul>
  );
}


export const getStaticProps = async (context) =>{
    const filePath = path.join(process.cwd(),'data', 'dummyData.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    if(!data){
        return{
            redirect: {
                destination: '/some-page'
            }
        }
    }

    if(data.length === 0){
        return{ notFound: true}
    }
    return{
        props:{
            products: data.products
        },
        revalidate: 10, // regenerate page after 10s
        // notFound: true   // returns 404 page
        // redirect: '/home'
    }
}

export default HomePage;
