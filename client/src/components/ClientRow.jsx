// This might be in a file like ClientRow.jsx or similar
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries'; // Import this if not already

function ClientRow({ client }) {
  // Find this useMutation hook
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    
    // Add these lines to ensure proper cache updates
    refetchQueries: [
      { query: GET_CLIENTS },
      { query: GET_PROJECTS } // This is the important part for updating the Projects component
    ],
    awaitRefetchQueries: true
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ClientRow;