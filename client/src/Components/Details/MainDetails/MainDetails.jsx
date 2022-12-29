import { useState } from 'react'
import {
    Flex,
    Text,
    Image,
    Heading,
    Box,
    Stack
} from '@chakra-ui/react'
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import Editor from '../../DetailBody/DetailBody'
import { formatDate } from '../../Card/CardHome'
import axios from "axios";
import { useAuth } from "../../AuthComponents/AuthContext"
import API_URL from "../../../config/environment"
import { useParams } from "react-router-dom";
import { useEffect } from 'react'

const MainDetails = ({ dataPost, setDataPost, votingData, setVotingData, userScore }) => {

    const { user } = useAuth();
    let token = user.accessToken;
    const idPost = useParams().id;

    const [numberOfVotesPost, setNumberOfVotes] = useState(parseInt(dataPost.post.score))
    const [numberOfVotesUser, setNumberOfVotesUser] = useState(parseInt(dataPost.post.user.score))

    useEffect(() => {

        if (numberOfVotesUser !== dataPost.post.user.score) {

            axios.get(API_URL + `/posts/${idPost}`, { headers: { Authorization: "Bearer " + token } })
                .then(res => { setDataPost(res.data) })

        }

    }, [numberOfVotesUser])

    const votePost = async (type) => {

        if (votingData !== type) {
            const res = await
                axios.put(API_URL + `/posts/${type}`, { post_id: idPost }, { headers: { Authorization: "Bearer " + token } })
            setVotingData(type)
            setNumberOfVotes(numberOfVotesPost + type + (votingData !== 0 ? type : 0))
            setNumberOfVotesUser(numberOfVotesUser + type + (votingData !== 0 ? type : 0))

        } else {
            const res = await
                axios.put(API_URL + `/posts/0`, { post_id: idPost }, { headers: { Authorization: "Bearer " + token } })
            setVotingData(0)
            setNumberOfVotes(numberOfVotesPost - type)
            setNumberOfVotesUser(numberOfVotesUser - type)
        }

    }

    return (
        <>
            <Flex position="relative"
                alignItems="flex-start"
                w="80%"
                minH="10rem"
                mt="3rem"
                p="1%"
                bg="#F2F2F2"
                borderRadius="md"
                fontWeight="semibold"
                gap="2%">
                <Flex w="7rem"
                    flexDir="column"
                    alignItems="center"
                    gap="1rem">
                    <Image src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Caffe Latte"
                        w="5rem"
                        h="5rem"
                        borderRadius="5rem"
                    />
                    <Stack fontSize="2rem" align="center">
                        {user.email !== dataPost.post.user.email &&
                            <TriangleUpIcon
                                color={votingData === 1 ? "green" : "gray"}
                                onClick={e => votePost(1)} />
                        }
                        <Text>
                            {numberOfVotesPost}
                        </Text>
                        {user.email !== dataPost.post.user.email &&
                            <TriangleDownIcon
                                color={votingData === -1 ? "red" : "gray"}
                                onClick={e => votePost(-1)} />
                        }
                    </Stack>
                </Flex>
                <Flex flexDir="column"
                    justifyContent="space-between"
                    w="full"
                    minH="14rem"
                    gap="2rem">
                    <Stack spacing={4}>
                        <Flex gap=".5rem" fontSize=".8rem">
                            <Text >
                                {dataPost.post.user.userSlack} • {formatDate(dataPost.post.createdAt)}
                            </Text>
                            <Image w="1.4rem" alignSelf="flex-start"
                                src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
                            {userScore}
                        </Flex>
                        <Heading fontSize="1.2rem" as="h2">
                            {dataPost.post.title}
                        </Heading>
                        <Editor body={dataPost.post.body} />
                    </Stack>
                    <Flex justifyContent="space-between">
                        <Text>Comentarios: {`(${dataPost.post.numberComments})`} <TriangleDownIcon /></Text>
                        <Flex gap="1rem" mr="2%">
                            {
                                dataPost.post.tags.map((e, i) =>
                                    <Box key={i}
                                        bg="#FFFF01"
                                        p=".4rem .7rem"
                                    >
                                        {e}
                                    </Box>
                                )
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex>

            </Flex>
        </>
    )
}

export default MainDetails;

/* <Text>{dataPost.post.body}</Text> */