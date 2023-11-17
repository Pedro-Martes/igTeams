import { Header } from "@components/Header";
import { HighLight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AppError } from "@utils/AppErros";

import { useEffect, useRef, useState } from "react";
import { FlatList, TextInput } from "react-native";
import { Alert } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./style";



import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroup } from "@storage/player/playersGetByGroup";
import { playersGetByGroupsAndTeam } from "@storage/player/playerGetBYGroupAddTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";


type RouteParams = {
    group: string
}


export function Players() {

    const [isLoading, setIsLoading] = useState(true)
    const [newPlayerName, setNewPLayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
    const route = useRoute()
    const { group } = route.params as RouteParams
    const newPlayerNameInputRef = useRef<TextInput>(null)
    const Navigation = useNavigation()



    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova Pessoa', 'Informe o nome do participante!')
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group);


            newPlayerNameInputRef.current?.blur();
            setNewPLayerName('')
            fetchPlayerByTeam()

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.');
            }

        }
    }

    async function fetchPlayerByTeam() {

        try {
            setIsLoading(true)
            const playersByTeam = await playersGetByGroupsAndTeam(group, team);
            setPlayers(playersByTeam)
            
        } catch (error) {
            
            console.log(error);
            
        }finally{
            
            setIsLoading(false)
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {

            await playerRemoveByGroup(playerName, group)
            fetchPlayerByTeam()

        } catch (error) {
            Alert.alert('Nova pessoa', 'Erro ao Remover Participante.');
            console.log(error);
        }
    }

    async function groupRemove() {

        try {

            await groupRemoveByName(group);
            Navigation.navigate('Groups')


        } catch (error) {
            console.log(error);
            Alert.alert('Remover Grupo', 'Não foi possível remover a turma .')
        }


    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover a turma?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() }
            ]
        )

    }

    useEffect(() => {
        fetchPlayerByTeam()
    }, [team])

    return (
        <Container>
            <Header showBackButton />

            <HighLight
                title={group}
                subtitle="Adicione as pessoas a turma"

            />

            <Form >
                <Input
                    placeholder="Nome do Participante"
                    autoCorrect={false}
                    onChangeText={setNewPLayerName}
                    value={newPlayerName}
                    inputRef={newPlayerNameInputRef}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>


            <HeaderList>

                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (

                        <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />
                    )}
                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>
            {
                isLoading ? <Loading /> :
                    <FlatList
                        data={players}
                        keyExtractor={item => item.name}
                        showsVerticalScrollIndicator={false}

                        contentContainerStyle={[
                            { paddingBottom: 100 },
                            players.length === 0 && { flex: 1 }
                        ]}

                        renderItem={({ item }) => (
                            <PlayerCard
                                name={item.name}
                                onRemove={() => handleRemovePlayer(item.name)}
                            />
                        )}

                        ListEmptyComponent={
                            () => (
                                <ListEmpty
                                    mensage="Sem Participantes cadastrados nesse time..."
                                />
                            )
                        }
                    />

            }
            <Button
                title="Remover Turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />



        </Container>
    )
}