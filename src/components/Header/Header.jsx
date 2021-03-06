import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, CircularProgress } from '@material-ui/core';
import WalletModal from './WalletModal.jsx';
// utils
import { shortenAddress } from '../../utils/address';
// hooks
import useBalance from '../../hooks/useBalance';
import usePendingTransactions from '../../hooks/usePendingTransactions';

const useStyles = makeStyles((theme) => {
    return {
        bar: {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            position: 'relative'
        },
        btn: {
            background: theme.palette.grey[800],
            color: '#fff',
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
            textTransform: 'initial',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: theme.palette.grey[900],
            },
        },
        balance: {
            background: '#20B2AA',
            color: '#fff',
            height: 40,
            lineHeight: '40px',
            paddingLeft: theme.spacing(2),
            paddingRight: 10 + theme.spacing(1),
            transform: 'translateX(10px)',
            borderRadius: 6,
            fontWeight: 'bold'
        },
        loading: {
            color: '#fff',
            marginRight: theme.spacing(1),
        }
    };
});

const Header = () => {
    const classes = useStyles();
    const [showWalletModal, setShowWalletModal] = useState(false);
    const { account } = useWeb3React();
    const balance = useBalance();
    const pending = usePendingTransactions();

    const handleClickConnect = () => setShowWalletModal((prev) => !prev);

    return (
        <AppBar className={classes.bar}>
            <Box p={3} display="flex" alignItems="center" justifyContent="flex-end">
                {account ? (
                    <>
                        {balance && 
                            <Box
                                className={classes.balance}
                            >
                                {`${String(balance).substring(0, 5)} ETH`}
                            </Box>
                        }
                        <Button className={classes.btn} onClick={handleClickConnect}>
                            {pending?.length ? (
                                <Box display="flex" alignItems="center">
                                    <CircularProgress size={16} thickness={5} className={classes.loading} />
                                    <span>{`${pending?.length} Pending`}</span>
                                </Box>
                            ) : (
                                <span>{shortenAddress(account)}</span>
                            )}
                        </Button>
                    </>
                ) : (
                    <Button className={classes.btn} onClick={handleClickConnect}>
                        Connect
                    </Button>
                )}
            </Box>
            <WalletModal open={showWalletModal} onClose={handleClickConnect} />
        </AppBar>
    );
};

export default Header;
