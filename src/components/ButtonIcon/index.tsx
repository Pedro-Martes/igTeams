import { TouchableOpacityProps } from "react-native";
import { Container, Icon } from "./style";
import { ButtonTypeStylesProps } from "@components/Button/style";
import {MaterialIcons} from '@expo/vector-icons'


type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap
    type?: ButtonTypeStylesProps
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: Props) {

    return (
        <Container {...rest}>
           <Icon
           name= {icon}
           type={type}
          
           />
           
        </Container>

    )

}