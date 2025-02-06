interface ItemsUserProps {
  picture: { thumbnail: string };
  name: { first: string; last: string };
  location: { country: string };
  email: string;
  deleteUser:(name:string)=>void
  isColored: boolean;
  index: number
}



export const ItemsUser = ({ picture, name, location, email,deleteUser, isColored, index }: ItemsUserProps) => {

  return (
    <tr className={`text-center ${isColored ? (index % 2 === 0 ? "bg-gray-300" : "bg-gray-500") : ""}`}>

          <td>
              <img
                src={picture.thumbnail}
                alt={`${name.first} ${name.last}`}
                className="mx-auto"
                />
          </td>
          <td>{name.first}</td>
          <td>{name.last}</td>
          <td>{location.country}</td>
          <td>
            <button
            onClick={()=>deleteUser(email)}
            className="bg-gray-200 py-2 px-4 cursor-pointer"
            >
              Delete
            </button>
          </td>
      </tr>
  );
};