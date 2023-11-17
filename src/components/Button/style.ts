import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStylesProps = 'PRIMARY' | 'SECONDARY';

type Props  = {
    type: ButtonTypeStylesProps
}

export const Container = styled(TouchableOpacity) <Props>`

flex: 1;
max-height: 56px;
min-width: 56px;

background-color: ${({theme,type}: any) => type == 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
border-radius: 6px;

justify-content: center;
align-items: center;
`

export const Title = styled.Text`

${({theme}: any)=> css`

font-size: ${theme.FONT_SIZE.MD }px;
color: ${theme.COLORS.WHITE };
font-family: ${theme.FONT_FAMILY.BOLD};

`}`;