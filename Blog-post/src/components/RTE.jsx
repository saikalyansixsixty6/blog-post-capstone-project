import {Editor} from "@tinymce/tinymce-react"


export default  function RTE() {
    return(
        <Editor
        initialValue="default value"
        init={
            {branding:false}
        }
        
        />
    )
}