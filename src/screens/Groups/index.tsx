
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Container, Title } from './styles';
import { Header } from '@components/Header';
import { HighLight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useEffect, useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { groupGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';


export function Groups() {

  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState([])
  const navigation = useNavigation()


  function handleNewGroup() {
    navigation.navigate('New')

  }

  async function fetchGroups() {

    try {
      setIsLoading(true);

      const data = await groupGetAll()
      setGroups(data);


    } catch (error) {

      console.log(error)
      
    } finally {

      setIsLoading(false)

    }

  }

  function handleOpenGroup(group: string) {

    navigation.navigate('Players', { group })

  }


  useFocusEffect(useCallback(() => {
    console.log(groups)
    fetchGroups();
  }, []));
  return (
    <Container>
      <Header />
      <HighLight title='Turmas' subtitle='Jogue com a sua turma' />

      {
        isLoading ? <Loading />
          :
          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={
              () =>
                <ListEmpty mensage='Sem Turmas Cadastradas' />
            }

          />
      }

      <Button
        title='Adicionar Nova Turma'
        onPress={handleNewGroup}
      />


    </Container>
  );
}



