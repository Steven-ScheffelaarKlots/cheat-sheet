# A simple note taking cmd line tool where you can store and read simple text notes
#Notes will be stored inside of a text file, where every line is a different note


def main():
    #Interpret command 
    #Should it be interactive, or just run a single command?
    #Single command/cmd line tool since I can just build an interface over it later

    #Get current notes storage
    with open("storage.txt", "a") as storage:
        notes = [line for line in storage]

        print(notes)

    #Find Note
        
    #Get Notes
        #By ID
        def getNoteByID(id: int) -> str:
            return notes[id]
        #All
        def getNotesAll() -> list[str]:
            return notes
    #Set Notes
        def setNote(message: str) -> None:
            storage.write(message)
    #Delete Notes
        #By id
        #Delete all
        #Delete by filter

main()