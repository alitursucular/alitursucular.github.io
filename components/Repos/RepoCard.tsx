import Link from "next/link";
import Tag, { TagsWrapper } from "@/components/Tag";
import { IAlitursucularGithubDataResponse } from "@/types/alitursucularGithubData";
import styles from "./Repos.module.scss";

const RepoCard: React.FC<{ repo: IAlitursucularGithubDataResponse }> = ({ repo }) => (
    <div className={styles.repoCard}>
        <Link href={`/repo/${repo.name}`} className={styles.repoCard_link}>
            <h3 className={styles.repoCard_title}>{repo.name}</h3>
            <p className={styles.repoCard_description}>{repo?.description}</p>
            <TagsWrapper>
                {repo.topics.map((topic, i) => (
                    <Tag key={Math.random() * i}>{topic}</Tag>
                ))}
            </TagsWrapper>
        </Link>
    </div>
);

export default RepoCard;
