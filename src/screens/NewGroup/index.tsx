import { Header } from "@components/Header";
import { Container } from "@screens/Groups/styles";
import { Content, Icon } from "./style";
import { HighLight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GroupCreate } from "@storage/group/createGroup";
import { AppError } from "@utils/AppErros";
import { Alert } from "react-native";

export function NewGroup() {

    const [group, setGroup] = useState('')

    const navigation = useNavigation();

    async function handleCreateNewGroup() {

        if(group.trim().length === 0) {

            return Alert.alert('Novo Grupo', 'Informe o nome da turma')

        }

        try {

            await GroupCreate(group)
            navigation.navigate('Players', { group: group })

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Novo Grupo', error.message)
            } else {
                Alert.alert('Novo Grupo', 'Não foi possível cadastrar novo grupo')
                console.log(error)
            }

        }


    }

    return (
        <Container>
            <Header showBackButton />


            <Content >

                <Icon />

                <HighLight
                    title="Nova Turma"
                    subtitle="Crie uma nova turma e adicione as pessoas"
                />

                <Input
                    placeholder="Nome da Turma"
                    onChangeText={setGroup}

                />

                <Button title="Criar" onPress={handleCreateNewGroup} />

            </Content>
        </Container>
    )

}