import { ButtonIcon } from "@components/ButtonIcon"
import { Container, Icon, PlayerName } from "./style"

type Props = {
    name: string
    onRemove: () => void
}

export function PlayerCard({ name, onRemove }: Props) {
    return(
        <Container>
            <Icon
            name="person"
            />

            <PlayerName>
                {name}
            </PlayerName>

            <ButtonIcon 
            icon="close"
            type="SECONDARY"
            onPress={onRemove}
            />
        </Container>
    )
}