// export const Myaction = async ({commit})=>{

// }
    import journalApi from "@/api/journalApi"

export const loadEntries = async ({commit})=>{
    const {data} = await journalApi.get('/entries.json')
    let entries = []
    if(data){
        for(let id of Object.keys(data)){
            entries.push({
                id,
                ...data[id]
            })
        }
    }        
    commit('setEntries', entries)
}

export const updateEntry = async ({commit}, entry)=>{
    const {date, picture, text} = entry
    const datatoSave = { date, picture, text }
    const resp= await journalApi.put(`/entries/${entry.id}.json`,datatoSave)
    console.log(resp);
    commit('updateEntry',{...entry})
}

export const createEntry = async ({commit}, entry)=>{
    const {data}= await journalApi.post(`/entries.json`,entry)
    const nueva = {id: data.name,...entry}
    commit('addEntry',nueva)
    return data.name
}

export const deleteEntry = async ({commit},id)=>{
    const {data}= await journalApi.delete(`/entries/${id}.json`)
    console.log(data);
    commit('deleteEntry',id)
    return id
}

