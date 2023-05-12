import Link from "next/link";
import Tag, { TagsWrapper } from "@/components/Tag";
import { IAlitursucularGithubDataResponse } from "@/types/alitursucularGithubData";
import styles from "./Repos.module.scss";

const RepoCard: React.FC<{ repo: IAlitursucularGithubDataResponse }> = ({ repo }) => (
    <div className={styles.repoCard}>
        <Link href={`/repo/${repo.name}`} className={styles.repoCard_link}>
            <h3 className={styles.repoCard_title}>{repo.name}</h3>
            <p className={styles.repoCard_description}>
                {repo.description ??
                    "Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh. Orci convallis pulvinar urna fusce at purus neque nam leo? Suspendisse semper facilisi parturient sit euismod placerat. Orci ante luctus praesent torquent orci commodo aptent blandit. Placerat arcu dui potenti; nullam taciti taciti amet."}
            </p>
            <TagsWrapper>
                {repo.topics.map((topic, i) => (
                    <Tag key={Math.random() * i}>{topic}</Tag>
                ))}
            </TagsWrapper>
        </Link>
    </div>
);

export default RepoCard;
