import stacklineLogo from '../../assets/stackline_logo.svg';

type NavProps = {
  className?: string;
};

export default function Nav({ className = '' }: NavProps) {
  return (
    <header className={`fixed top-0 left-0 bg-blue-950 w-full shadow-md h-[60px] flex items-center ${className}`}>
      <a href="https://www.stackline.com/" target="_blank" rel="noopener noreferrer">
        <img src={stacklineLogo} className="h-6 ml-4 p-1" alt="Stackline logo" />
      </a>
    </header>
  );
}
