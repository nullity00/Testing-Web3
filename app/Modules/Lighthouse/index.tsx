import useLighthouse from "../../Services/Lighthouse/useLighthouse";

function Lighthouse() {
  const { deployEncrypted } = useLighthouse();
  /*Visit: 
        https://files.lighthouse.storage/viewFile/<cid>  
      To view encrypted file
    */

  return (
    <div>
      <input onChange={(e) => deployEncrypted(e)} type="file" />
    </div>
  );
}

export default Lighthouse;
