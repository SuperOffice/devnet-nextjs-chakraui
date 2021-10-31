import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import withAuth from '../hocs/withAuth';
import LayoutAdmin from '../components/layouts/Admin';
import {
  Flex,
  Box,
  Skeleton,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Link,
  Switch,
  Progress,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

let panelData = {
  Name: 'SuperOffice Example App 2',
  OnCentral: true,
  OnSalesMarketingPocket: false,
  OnSalesMarketingWeb: true,
  OnSatellite: false,
  OnTravel: false,
  ProgId: 'superoffice-example-app-2',
  ShowInAddressBar: false,
  ShowInMenuBar: false,
  ShowInStatusBar: false,
  ShowInToolBar: false,
  TableRight: null,
  Tooltip: 'SuperOffice Example App',
  Url: 'http://localhost:3000/panel?uctx=<uctx>&cuid=<cuid>&atid=<atid>&said=<said>&prid=<prid>',
  UrlEncoding: 'Unknown',
  VisibleIn: 'BrowserPanel',
  WindowName: 'SuperOfficeExampleApp2',
};

function Admin({ isInstalled, webPanelId }) {
  const [session] = useSession();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [panel, setPanel] = useState({ isInstalled, webPanelId });

  const handleCreateWebPanel = async () => {
    setFetching(true);
    setPanel({ ...panel, isInstalled: true });
    if (panel.id > 0) {
      panelData['WebPanelId'] = panel.id;
      await axios
        .put(`/api/superoffice/List/WebPanel/Items/${panel.id}`, panelData)
        .then((res) => {
          setPanel({ ...panel, isInstalled: true });
          toast({
            title: 'App web panel successfully enabled',
            description: (
              <Link
                href={`https://${session.env}.superoffice.com/${session.ctx}/admin/default.aspx?adminlists.main?adminlist_id=28`}
                isExternal
              >
                Click here to check it out.
              </Link>
            ),
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.error(err);
          setPanel({ ...panel, isInstalled: false });
          toast({
            title: 'Something went wrong',
            description: 'Error while creating app panel data.',
            status: 'warning',
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      await axios
        .post('/api/superoffice/List/WebPanel/Items', panelData)
        .then((res) => {
          setPanel({ isInstalled: true, id: res.data.WebPanelId });
          toast({
            title: 'App web panel successfully created',
            description: (
              <Link
                href={`https://${session.env}.superoffice.com/${session.ctx}/admin/default.aspx?adminlists.main?adminlist_id=28`}
                isExternal
              >
                Click here to enable it for your users.
              </Link>
            ),
            status: 'success',
            duration: null,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.error(err);
          setPanel({ ...panel, isInstalled: false });
          toast({
            title: 'Something went wrong',
            description: 'Error while creating app panel data.',
            status: 'warning',
            duration: 9000,
            isClosable: true,
          });
        });
    }

    setFetching(false);
  };

  const handleDeleteWebPanel = async () => {
    console.log(panel);
    setFetching(true);
    setPanel({ ...panel, isInstalled: false });
    await axios
      .delete(`/api/superoffice/List/WebPanel/Items/${panel.id}`)
      .then((res) => {
        if (res.status === 204) {
          setPanel({ ...panel, isInstalled: false });
        }
        toast({
          title: 'App web panel successfully deleted',
          description: (
            <Link
              href={`https://${session.env}.superoffice.com/${session.ctx}/admin/default.aspx?adminlists.main?adminlist_id=28`}
              isExternal
            >
              Click here to check it out.
            </Link>
          ),
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);
        setPanel({ ...panel, isInstalled: true });
        toast({
          title: 'Something went wrong',
          description: 'Error while fetching app panel data.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
      });
    setFetching(false);
  };

  const handleToggle = (event) => {
    if (panel.isInstalled) {
      handleDeleteWebPanel();
    } else {
      handleCreateWebPanel();
    }
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get('/api/superoffice/List/WebPanel/Items')
        .then((res) => {
          const isInstalled = res.data.filter(
            (item) => item.ProgId === 'superoffice-example-app-2'
          );
          setPanel({
            isInstalled: isInstalled.length > 0 && !isInstalled[0].Deleted,
            id: isInstalled.length > 0 ? isInstalled[0].WebPanelId : 0,
          });
        })
        .catch((err) => {
          toast({
            title: 'Something went wrong',
            description: 'Error while fetching app panel data.',
            status: 'warning',
            duration: 9000,
            isClosable: true,
          });
          console.error(err);
        });
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <LayoutAdmin>
      <Flex
        direction="column"
        p={4}
        h="50vh"
        justifyContent="center"
        alignItems="center"
      >
        <Box mb={16}>
          <Heading size="lg">Hello 👋 {session.user.initials}</Heading>
        </Box>
        <Box mb={16}>
          {loading ? (
            <Skeleton h="28px" w="300px" />
          ) : (
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="web-panel-toggle" mb="0">
                Wanna{' '}
                <Text as="mark">
                  {panel.isInstalled
                    ? 'delete'
                    : panel.id > 0
                    ? 'enable'
                    : 'install'}
                </Text>{' '}
                app web panel?
              </FormLabel>
              <Switch
                id="web-panel-toggle"
                size="lg"
                colorScheme="teal"
                isChecked={panel.isInstalled}
                onChange={handleToggle}
                isReadOnly={fetching}
              />
            </FormControl>
          )}
        </Box>
        <Box w="100%" h="30px">
          {fetching && (
            <Progress size="md" colorScheme="pink" isIndeterminate h="30px" />
          )}
        </Box>
      </Flex>
    </LayoutAdmin>
  );
}

export default withAuth(Admin, { admin: true });
