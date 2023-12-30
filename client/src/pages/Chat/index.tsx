import { useAuth } from "../../context/AuthContext";

const Chat = () => {
    const {isLoading} = useAuth();
    console.log(isLoading, "here");
    return ( 
        <section>
            Chat Page
        </section> 
    );
}
 
export default Chat;