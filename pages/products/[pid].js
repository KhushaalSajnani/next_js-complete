import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = (props) => {

    if(!props.productDetail){
        return <h1>Loading Data!!!</h1>
    }

    return(
        <>
            <h1>{props.productDetail.description}</h1>
        </>
    )
}

export default ProductDetailPage


const getDataFromFile = async () => {
    const filePath = path.join(process.cwd(),'data', 'dummyData.json');
    const jsonData = await fs.readFile(filePath);
    return JSON.parse(jsonData);

}
export const getStaticProps = async (context) => {

    const {params} = context;
    const productId = params.pid;

    const data = await getDataFromFile()

    const product = data.products.find(product => product.id === productId);

    if(!product){
        return {
            notFound: true
        }
    }

    return{
        props:{
            productDetail: product
        }
    }
}


export const getStaticPaths = async () => {

    const data = await getDataFromFile();

    const ids = data.products.map(product => product.id);

    const paramsMapped = ids.map(id=> ({params : {pid: id} }));


    return{
        // paths:[
        //     { params: { pid: 'p1'}},
        //     { params: { pid: 'p2'}},
        //     { params: { pid: 'p3'}}
        // ],
        // fallback: true // make it true so that it will also load pid which are not mentioned above

        paths: paramsMapped,
        fallback: true
    }
}
