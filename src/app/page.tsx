/*
 This file defines the home page.
 It shows a clean starting screen for the project.
 You can replace this content with your first real section.
*/
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      {/* Main title for an empty project start page */}
      <h1 className={styles.title}>Project start page</h1>

      {/* Short helper text to show where to begin */}
      <p className={styles.subtitle}>Ready for your first block or component.</p>
    </main>
  );
}
