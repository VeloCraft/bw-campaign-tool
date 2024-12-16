import React from 'react';
import AppWrapper from '@/components/AppWrapper';
import { Flex, Button, Container, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import UserMenu from '@/components/Users/Menu';

export default function HomePage() {
  return (
    <AppWrapper actions={<UserMenu />}>
      <Container>
        <Heading size="8">Welcome to the Campaign Management Tool</Heading>
        <Text size="4" mt="4">
          This platform allows you to manage and track your campaigns with ease.
          You can create new campaigns, edit existing ones, and see all the
          details in one place. Our goal is to make managing and contributing to
          campaigns simple and accessible for everyone!
        </Text>

        <Heading size="6" mt="8">
          How to Use the Platform
        </Heading>

        <Text size="4" mt="4">
          <ul>
            <li>
              <strong>Create a Campaign:</strong> Start by creating a new
              campaign. Simply provide the campaigns name and description.
            </li>
            <li>
              <strong>Edit a Campaign:</strong> Edit any existing campaign. Add
              details like status, and contribute information to help others get
              involved.
            </li>
            <li>
              <strong>Track Progress:</strong> Keep track of your campaigns
              status and how people can help with each one.
            </li>
          </ul>
        </Text>

        <Heading size="6" mt="8">
          Need Help?
        </Heading>

        <Text size="4" mt="4">
          If you have any questions or need assistance using the platform, feel
          free to reach out. We are here to help you manage your campaigns
          successfully.
        </Text>

        <Flex direction="row" align="center" justify="center" mt="8">
          <Button size="4" asChild>
            <Link href="/campaigns">View Campaigns</Link>
          </Button>
        </Flex>
      </Container>
    </AppWrapper>
  );
}
