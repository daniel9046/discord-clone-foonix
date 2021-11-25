import React, { useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Hashtag from "./shared/Hashtag";
import AvatarWithStatus from "./shared/AvatarWithStatus";
import Stack from "./shared/Stack";
import ListItem from "./shared/ListItem";
import { useGetActiveChannelId } from "../hooks";
import { loadChannels } from "../reducers/chatReducer";

const Container = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
`

const Header = styled.div`
  background-color: var(--background-secondary);
  border-bottom: 1px solid var(--background-tertiary);
  height: 48px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 0 16px;
`

const Heading = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: var(--header-primary);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Content = styled.div`
  background-color: var(--background-secondary);
  flex: 1;
  height: calc(100vh - 48px - 52px);
  padding: 10px 2px 10px 8px;
`

const Footer = styled.div`
  background-color: var(--background-secondary-alt);
  height: 52px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px;
`

const Username = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--header-primary);
  font-weight: 600;
  font-size: 14px;
`

const ChannelList = () => {
  const user = useSelector(state => state.session.user);
  
  const channels = useSelector((state) => state.chat.channels);
  const activeChannelId = useGetActiveChannelId();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadChannels());
  }, [dispatch])

  return (
    <Container className="disable-select">
      <Header>
        <Heading>Server name</Heading>
      </Header>
      <Content className="scrollable">
        <Stack gap="2px">
          {!channels.pending && channels.allIds.map((id) => (
            <Link key={id} to={`/channels/${id}`}>
              <ListItem
                icon={<Hashtag style={{ fontSize: "20px" }}/>}
                text={channels.byId[id].name}
                style={{ gap: "8px", padding: "2px"}}
                isActive={id === activeChannelId}
              />
            </Link>
          ))}
        </Stack>
      </Content>
      <Footer>
        <AvatarWithStatus />
        <Username>{user.username}</Username>
      </Footer>
    </Container>
  )
}

export default ChannelList
