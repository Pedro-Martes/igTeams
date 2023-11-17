import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppErros";

export async function GroupCreate(newGroupName: string){
    try {

        const storageGroups = await groupGetAll();
        const storage = JSON.stringify([]);
        const groupAlredyCreated = storageGroups.includes(newGroupName)

        if(groupAlredyCreated){
            throw new AppError('Ja existe um Grupo com esse nome')
        }
       

        await AsyncStorage.setItem(GROUP_COLLECTION,storage )
    }catch(error){

        throw error;
    }
}