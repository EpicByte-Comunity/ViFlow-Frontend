import {
  Bars3CenterLeftIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import FormModalLayout from "../../layouts/FormModalLayout";
import { useIuStore } from "../../store/uiStore";
import { useUserStore } from "../../store/userStore";
import { addToPost, PostType } from "../../data/data";
import { useState } from "react";
import ImgProfile from "../../utils/ImgProfile";

const NewPostModal: React.FC = () => {
  const [postState, setPostState] = useState<string>("");

  //estados globales
  const { setNewPostModal } = useIuStore();
  const { userNameState, logoState } = useUserStore();

  const handleToPost = () => {
    const post: PostType = {
      id: 1, // Se actualizará al añadirlo
      img: logoState,
      name: userNameState,
      post: postState,
      time: "Justo ahora",
      follow: true,
    };
    addToPost(post);
    setPostState("");
    setNewPostModal(false);
  };

  const btnStyle =
    "flex items-center button-theme justify-center gap-x-1 text-[#ccc] hover:text-white rounded-2xl transition-all ease-in-out p-1 px-2 hover:bg-[#202020] cursor-pointer";

  return (
    <FormModalLayout>
      {/* Header */}
      <header className="relative w-full px-4 py-2 border-b border-style flex justify-center ">
        <h1 className="font-semibold">Nuevo Hilo</h1>
        <button
          onClick={() => setNewPostModal(false)}
          className="absolute left-4 top-2"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
      </header>
      <div className="mx-6 my-4 relative">
        {/* Info Usuario */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-9 h-9">
            <ImgProfile img={logoState} ifExist={true} />
          </div>
          <div className="w-full">
            <p className="text-[16px]">{userNameState}</p>
            <input
              type="text"
              autoFocus
              value={postState}
              onChange={(e) => setPostState(e.target.value)}
              placeholder="¿Qué novedades tienes?"
              className="w-full text-white font-extralight text-sm outline-none"
            />
          </div>
        </div>
        {/* Iconos */}
        <ul className="ml-4 pl-6 pb-2 border-l-3 border-style mt-2 flex gap-4 text-[#888] transition-all ease-in-out">
          <li className={`${btnStyle}`}>
            <Bars3CenterLeftIcon className="w-5 h-5" />
          </li>
          <li className={`${btnStyle}`}>
            <PhotoIcon className="w-5 h-5" />
          </li>
        </ul>
        {/* Agregar hilo */}
        <div className="flex gap-2 ml-1 mt-2 items-center select-none">
          <img
            src={logoState || "/userPreviu.webp"}
            alt="logo"
            className="w-6 h-6 object-cover object-center rounded-full opacity-50 cursor-no-drop"
          />
          <p className="text-[#555] text-xs cursor-no-drop">Agregar a hilo</p>
        </div>
        {/* Boton */}
        <button
          onClick={handleToPost}
          className="px-4 py-1 border border-style rounded-xl shadow button-theme absolute bottom-0 right-0"
        >
          Publicar
        </button>
      </div>
    </FormModalLayout>
  );
};

export default NewPostModal;
