import { Container, Message } from "./style"

type Props = {
    mensage: string
}

export function ListEmpty({mensage}: Props){

    return(
        <Container>
            <Message >{mensage}</Message>
        </Container>
    )

}