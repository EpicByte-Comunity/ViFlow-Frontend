import NewPostHeader from "../components/home/NewPostHeader";
import Post from "../components/home/Post";
import MainLayout from "../layouts/MainLayout";
import { PostData, addCommentToPost, CommentType } from "../data/data";
import NewComment from "../components/home/newComment";
import { useState } from "react";
import { useUserStore } from "../store/userStore";
import { useIuStore } from "../store/uiStore";
import NewPostModal from "../components/home/NewPostModal";

const Home: React.FC = () => {
  const [modalComment, setModalComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<string>("");

  //estados globales
  const { logoState, nameState } = useUserStore();
  const { newPostModal } = useIuStore();

  // Abrir modalNewcommet y obtener data
  const handleCommentClick = (postId: number) => {
    setSelectedPost(postId);
    setModalComment(true);
  };

  // Añadir nuevo comentario
  const handleAddComment = () => {
    if (selectedPost && newComment) {
      const comment: CommentType = {
        id: 0, // Se actualizará al añadirlo
        img: logoState,
        name: nameState,
        post: newComment,
        time: "Justo ahora",
      };
      addCommentToPost(selectedPost, comment);
      setNewComment("");
    }
  };

  // Filtrado por id de post seleccionado
  const filterInfo = PostData.find((post) => post.id === selectedPost) || null;

  return (
    <>
      {newPostModal && <NewPostModal />}

      {/* Modal para nuevo comentario */}
      {modalComment && filterInfo && (
        <NewComment
          toggleModalComment={() => setModalComment(false)} //cerrar modal
          commentData={filterInfo} //info de post seleccionado
          newComment={newComment} //estado actual con el nuevo comentario
          setNewComment={setNewComment} //actualiza el nuevo comentario
          handleAddComment={handleAddComment} //agregar nuevo comentario
        />
      )}

      {/*------- Layout principal -------- */}
      <MainLayout>
        <div className="w-full h-auto">
          <NewPostHeader />
          {PostData?.map((post, index) => (
            <Post
              key={index}
              img={post.img}
              name={post.name}
              post={post.post}
              time={post.time}
              amountLike={post.amountLike}
              amountComments={post.amountComments}
              amountRepost={post.amountRepost}
              toggleModalComment={() => handleCommentClick(post.id)}
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
