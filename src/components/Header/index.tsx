
import { BackButton, BackIcon, Container, Logo } from "./style";
import logoImg from "@assets/logo.png"
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

type props = {
    showBackButton?: boolean
}

export function Header({ showBackButton = false }: props) {

    const navigation = useNavigation()

    function hanleBackToHomeScreen() {
        navigation.navigate('Groups');
    }

    return (

        <Container>
            {
                showBackButton  ?
                    <>
                        <BackButton onPress={hanleBackToHomeScreen}>
                            <BackIcon />
                        </BackButton>

                        <Logo source={logoImg} />
                    </>

                    :
                    <Logo source={logoImg} />
            }
           

        </Container>

    )

}