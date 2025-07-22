import skeleton from '@/app/ui/skeletoncss/navbar.module.css';

// Loading animation
const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function NavBarSkeleton() {
  return (
    <nav className={`${skeleton.navigation} ${shimmer}`}>
      <div className={skeleton.logo_container}></div>
      <div className={skeleton.links_container}></div>
    </nav>
  );
}