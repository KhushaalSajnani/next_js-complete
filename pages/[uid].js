function UserIdPages(props){
    return <h1> {props.id} </h1>

}

export default UserIdPages;


// serverSideProps doesn't need getStaticPaths as it does not pre-generate anything!

export async function getServerSideProps(context){
    const {params} = context;
    const userId = params.uid;
    return{
        props: {
            id: 'user-id->'+userId
        }
    }
}
