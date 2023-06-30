import { useAuth } from "./utils/AuthContext"
import { Container, Typography,Box } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles";
import { mainData } from "./common/Data";
import Themes from "./common/Theme"
import Carousels from "./common/Carousels";
import Products from "./Products";

export default function Home(){
    const {currentUser} = useAuth()
    console.log(mainData.CategoryMain)
    return(
            <ThemeProvider theme={Themes}>
                <Carousels items={mainData.CategoryMain} category="Featured Products" bg="whitesmoke" /> 
                <Products items={mainData.Products } category="Products" bg="white"/>
            </ThemeProvider>

    )
}