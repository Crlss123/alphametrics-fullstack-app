import { Person } from "my-types";

type Props = {
  person: Person | null;
  onDeleteConfirm: () => void;
};


export default function DeleteModal( {person, onDeleteConfirm }: Props ){
    return(
      <>
        <div className="modal fade" id="deletePersonModal" role="dialog" aria-labelledby="deletePersonModalLabel" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deletePersonModalLabel">Confirmar eliminación</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {person && (
                        <p>¿Deseas eliminar a <strong>{person.first_name} {person.first_lastname}</strong>?</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button 
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={onDeleteConfirm}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
