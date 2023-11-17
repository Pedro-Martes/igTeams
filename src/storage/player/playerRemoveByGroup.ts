import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { playerGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playername:string, group: string) {

    try {
        const storage = await playerGetByGroup(group)

        const filteres = storage.filter(player => player.name !== playername);
        const players = JSON.stringify(filteres);

        await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, players);

    
        
    }catch(error){
        throw(error)
    }
    
}