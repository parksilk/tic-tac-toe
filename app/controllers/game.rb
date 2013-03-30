get '/game/:username/start' do
  @game = Game.new
  @user = current_user
  erb :game_start
end

get '/game/:username/join' do
  @game = Game.new
  @user = current_user
  erb :game_join
end

get '/games' do
  @user = current_user
  p current_user.inspect
  current_user.inspect
  erb :games
end
