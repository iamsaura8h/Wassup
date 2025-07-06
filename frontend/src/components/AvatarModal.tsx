const avatars = Array.from({ length: 15 }, (_, i) => `/avatars/avatar${i + 1}.jpg`);

export default function AvatarModal({ setAvatar, close }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded grid grid-cols-4 gap-4">
        {avatars.map((src) => (
          <img
            key={src}
            src={src}
            alt="photu"
            className="w-16 h-16 cursor-pointer rounded-full hover:ring"
            onClick={() => {
              setAvatar(src);
              close();
            }}
          />
        ))}
      </div>
    </div>
  );
}
