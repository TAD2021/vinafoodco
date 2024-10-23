import { useCallback, useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';

const CommentSection = ({ productSlug }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(null);

    // Fetch comments from API
    const fetchComments = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/comments/${productSlug}`, {
                method: 'GET',
                cache: 'no-store',
            });
            if (!response.ok) {
                throw new Error('Không thể lấy bình luận');
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            setError(error.message);
        }
    }, [productSlug]);

    useEffect(() => {
        fetchComments(); // Fetch comments on component mount
    }, [fetchComments]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === "" || name.trim() === "") return; // Prevent empty comments

        try {
            const response = await fetch(`http://localhost:3000/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newComment,
                    name: name,
                    slug: productSlug,
                    rating: rating,
                }),
            });

            if (!response.ok) {
                throw new Error('Gửi bình luận không thành công');
            }

            // Reset form after successful submission
            setSuccess(true);
            setNewComment("");
            setName("");
            setRating(0);
            fetchComments(); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold">Bình luận</h2>
            {success && <p className="text-green-500">Bình luận đã được gửi thành công!</p>}
            {error && <p className="text-red-500">Lỗi: {error}</p>}
            <form onSubmit={handleCommentSubmit} className="mt-4">
                <div>
                    <p className="text-gray-700 mb-2">Đánh giá của bạn</p>
                    <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div
                                key={star}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(null)}
                                onClick={() => setRating(star)}
                                className="cursor-pointer"
                            >
                                {star <= (hoveredStar || rating) ? (
                                    <FaStar className="text-yellow-500 h-5 w-5" />
                                ) : (
                                    <CiStar className="text-gray-300 h-5 w-5" />
                                )}
                            </div>
                        ))}
                    </div>
                    <input 
                        className="w-full p-2 mb-4 border border-gray-300 rounded" 
                        placeholder="Họ tên*" 
                        type="text" 
                        value={name}
                        onChange={handleNameChange}
                    />
                    <textarea 
                        className="w-full p-2 mb-4 border border-gray-300 rounded" 
                        placeholder="Bình luận*" 
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    < button className="bg-green-600 text-white py-2 px-6 rounded">
                        Gửi
                    </button>
                </div>
            </form>
            <div className="mt-4">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="border-b py-4 mb-4 last:border-b-0">
                            <div className="flex items-center mb-2">
                                <p className="font-bold text-lg">{comment.name}</p>
                                <div className="flex ml-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <>
                                            {star <= comment.rating ? (
                                                <FaStar key={star} className="text-yellow-500 h-5 w-5" />
                                            ) : (
                                                <CiStar key={star} className="text-gray-300 h-5 w-5" />
                                            )}
                                        </>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p>Chưa có bình luận nào.</p>
                )}
            </div>
        </>
    );
}

export default CommentSection;