import axios from "axios";
import { QueryKeysEnum } from "@/types/queryKeys";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IAlitursucularGithubDataResponse } from "@/types/alitursucularGithubData";

const alitursucularGithubData = async (): Promise<IAlitursucularGithubDataResponse[]> => {
    const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:5001/github-repository-fetcher/us-central1/app/alitursucularGithubRepos`,
        headers: {
            "Content-Type": "application/json"
            // Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;
};

const alitursucularGithubDataByName = async (repoName: string): Promise<IAlitursucularGithubDataResponse> => {
    const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:5001/github-repository-fetcher/us-central1/app/alitursucularGithubRepoByName/${repoName}`,
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
};

const useFetchGitHub = (): UseQueryResult<IAlitursucularGithubDataResponse[], unknown> => {
    return useQuery<IAlitursucularGithubDataResponse[], unknown>({
        queryKey: [QueryKeysEnum.ALITURSUCULAR_GITHUB_DATA],
        queryFn: alitursucularGithubData
    });
};

const useGithubDataByName = (repoName: string): UseQueryResult<IAlitursucularGithubDataResponse, unknown> => {
    console.log("in the hook: ", repoName);

    return useQuery<IAlitursucularGithubDataResponse, unknown>({
        queryKey: [QueryKeysEnum.ALITURSUCULAR_GITHUB_DATA_BY_NAME, repoName],
        queryFn: () => alitursucularGithubDataByName(repoName)
    });
};

export { alitursucularGithubData, alitursucularGithubDataByName, useFetchGitHub, useGithubDataByName };
