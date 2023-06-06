import ModalContainer from "./ModalContainer";
import { useFlashMemoStore } from "../context/zustandStore";
import Input from "./Input";

const EditDeckNameModal = () => {
  const isEditDeckNameModalOpen = useFlashMemoStore(
    (state) => state.isEditDeckNameModalOpen
  );
  const setIsEditDeckNameModalOpen = useFlashMemoStore(
    (state) => state.setIsEditDeckNameModalOpen
  );

  return (
    <ModalContainer
      {...{
        isModalOpen: isEditDeckNameModalOpen,
        setIsModalOpen: setIsEditDeckNameModalOpen,
      }}
    >
      <form className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">Edit Deck Name</h3>

        <Input labelText="Deck Name" isSecondVariant />
        <div className="flex justify-end">
          <button className="py-2 px-4 w-[78px] font-semibold rounded dark:bg-neutral-700 bg-gray-200  dark:text-white">
            Edit
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default EditDeckNameModal;
