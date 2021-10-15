use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod bet_program {
    use super::*;

    pub fn create_bet(ctx: Context<CreateBet>, bet: u64, team:u8) -> ProgramResult {
        let bet_account = &mut ctx.accounts.bet_account;
        bet_account.bet = bet;
        bet_account.team = team;
        Ok(())
    }

    pub fn update_bet(ctx: Context<UpdateBet>, bet: u64, team:u8) -> ProgramResult {
        let bet_account = &mut ctx.accounts.bet_account;
        bet_account.bet = bet;
        bet_account.team = team;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateBet<'info> {
    #[account(init, payer = user, space = 8 + 8 + 3)]
    pub bet_account: Account<'info, BetAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateBet<'info> {
    #[account(mut)]
    pub bet_account: Account<'info, BetAccount>,
}

#[account]
pub struct BetAccount {
    pub bet: u64,
    pub team: u8
}

