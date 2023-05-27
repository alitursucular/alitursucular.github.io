import axios from "axios";
import { QueryKeysEnum } from "@/types/queryKeys";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IAlitursucularGithubDataResponse } from "@/types/alitursucularGithubData";

const alitursucularGithubData = async (): Promise<IAlitursucularGithubDataResponse[]> => {
    const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_FIREBASE_MICROSERVICE_URL}/alitursucularGithubRepos`,
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
};

const alitursucularGithubDataByName = async (repoName: string): Promise<IAlitursucularGithubDataResponse> => {
    const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_FIREBASE_MICROSERVICE_URL}/alitursucularGithubRepoByName/${repoName}`,
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
};

const useFetchGitHub = (): UseQueryResult<IAlitursucularGithubDataResponse[], { message: string }> =>
    useQuery<IAlitursucularGithubDataResponse[], { message: string }>({
        queryKey: [QueryKeysEnum.ALITURSUCULAR_GITHUB_DATA],
        queryFn: alitursucularGithubData
    });

const useGithubDataByName = (repoName: string): UseQueryResult<IAlitursucularGithubDataResponse, { message: string }> =>
    useQuery<IAlitursucularGithubDataResponse, { message: string }>({
        queryKey: [QueryKeysEnum.ALITURSUCULAR_GITHUB_DATA_BY_NAME, repoName],
        queryFn: () => alitursucularGithubDataByName(repoName)
    });

export { alitursucularGithubData, alitursucularGithubDataByName, useFetchGitHub, useGithubDataByName };
