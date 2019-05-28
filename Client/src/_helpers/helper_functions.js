export function getUnique(arr,comp){

  //store the comparison  values in array
const unique =  arr.map(e=> e[comp]). 
// store the keys of the unique objects
map((e,i,final) =>final.indexOf(e) === i && i) 
// eliminate the dead keys & return unique objects
.filter((e)=> arr[e]).map(e=>arr[e]);

return unique

}